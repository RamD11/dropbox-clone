from django.http import FileResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import File
import os

# formatting file size to human readable
def format_file_size(bytes):
    if bytes == 0:
        return "0 Bytes"
    k = 1024
    sizes = ["Bytes", "KB", "MB", "GB"]
    i = int(min(len(sizes) - 1, max(0, (bytes.bit_length() - 1) // 10)))
    return f"{bytes / (k ** i):.2f} {sizes[i]}"

# API to list the files
class FileList(APIView):
    def get(self, request):
        files = File.objects.all()
        file_list = []
        for file in files:
            file_path = file.file.path
            file_size = os.path.getsize(file_path) if os.path.exists(file_path) else 0
            file_list.append({
                'id': file.id,
                'name': file.name,
                'size_bytes': file_size,
                'size_formatted': format_file_size(file_size),
                'uploaded_at': file.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')
            })
        return Response(file_list)

# API to upload the files
class FileUpload(APIView):
    def post(self, request):
        allowed_extensions = {'.jpeg', '.jpg', '.png', '.pdf', '.docx', '.txt', '.doc', '.xls', '.xlsx'}
        file_obj = request.FILES['file']
        file_extension = os.path.splitext(file_obj.name)[1].lower()
        
        if file_extension not in allowed_extensions:
            return Response(
                {'error': f'Invalid file type. Allowed types: {", ".join(allowed_extensions)}'},
                status=400
            )
        
        new_file = File.objects.create(name=file_obj.name, file=file_obj)
        return Response({'id': new_file.id, 'name': new_file.name})

# API to download the files 
class FileDownload(APIView):
    def get(self, request, pk):
        file = File.objects.get(pk=pk)
        view_mode = request.query_params.get('view', 'false').lower() == 'true'
        
        if view_mode:
            # Serve file for viewing; column1
            response = FileResponse(
                open(file.file.path, 'rb'),
                content_type='text/plain' if file.name.endswith('.txt') else None,
                as_attachment=False
            )
        else:
            # Serve file for download; last column
            response = FileResponse(
                open(file.file.path, 'rb'),
                filename=file.name,
                as_attachment=True
            )
        return response
from django.urls import path
from .views import FileList, FileUpload, FileDownload

urlpatterns = [
    path('list/', FileList.as_view()),
    path('upload/', FileUpload.as_view()),
    path('download/<int:pk>/', FileDownload.as_view()),
]
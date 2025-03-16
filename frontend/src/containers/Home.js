import React, { useContext } from 'react';
import { FileContext } from '../context/FileContext';

import { 
  Container, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Box,
  Link
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

function Home() {
  const { files, handleUpload, handleDownload, handleViewFile } = useContext(FileContext);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        bgcolor="#1976d2"
        color="white"
        py={3}
        mb={4}
        textAlign="center"
        borderRadius={1}
      >
        <Typography variant="h3" gutterBottom>
          Fullstack Project
        </Typography>
      </Box>

      {/* Upload Files Button */}
      <Box
        mb={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="body1" gutterBottom>
          Click here to upload files
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload File
          <input
            type="file"
            hidden
            accept=".jpeg,.jpg,.png,.pdf,.docx,.txt,.doc,.xls,.xlsx"
            onChange={(event) => handleUpload(event.target.files[0])}
          />
        </Button>
      </Box>


      <Box>
        <Typography variant="h5" gutterBottom>
          List Of Files
        </Typography>
        {files.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No files uploaded yet.
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              border: '2px solid #bdbdbd', 
              borderRadius: 1,
            }}
          >
            {/* Table to list all the files */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontWeight: 'bold' }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontWeight: 'bold' }}>
                    Size
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #e0e0e0', fontWeight: 'bold' }}>
                    Time Uploaded
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottom: '1px solid #e0e0e0', fontWeight: 'bold' }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map(file => (
                  <TableRow key={file.id}>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleViewFile(file.id)}
                        underline="hover"
                      >
                        {file.name}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      {file.size_formatted}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      {file.uploaded_at}
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      <IconButton
                        onClick={() => handleDownload(file.id, file.name)}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
}

export default Home;
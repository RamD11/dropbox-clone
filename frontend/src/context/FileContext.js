import React, { createContext, useState, useEffect } from 'react';
import { getFiles, uploadFile, downloadFile } from '../api';

// The FileContext
export const FileContext = createContext();

// Provider component
export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);

  // Fetching files on mount
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await getFiles();
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;
    try {
      await uploadFile(file);
      fetchFiles();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleDownload = async (id, name) => {
    try {
      const response = await downloadFile(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleViewFile = (id) => {
    const viewUrl = `http://localhost:8000/api/files/download/${id}/?view=true`;
    window.open(viewUrl, '_blank');
  };


  
  return (
    <FileContext.Provider
      value={{
        files,
        fetchFiles,
        handleUpload,
        handleDownload,
        handleViewFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
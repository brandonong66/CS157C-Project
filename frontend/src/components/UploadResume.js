import React from "react"
import { Box, Button } from "@mui/material"

function UploadPDF() {
  const [pdfFile, setPdfFile] = React.useState(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setPdfFile(selectedFile)
  }
  const handleFileSubmit = (event) => {
    event.preventDefault()
    if (pdfFile) {
      const fileURL = URL.createObjectURL(pdfFile)
    }
  }
  return (
    <div>
      <Box component="form" onSubmit={handleFileSubmit}>
        <input type="file" onChange={handleFileChange} />
        <Button type="submit" disabled={!pdfFile}>
          Upload
        </Button>
      </Box>
    </div>
  )
}

export default UploadPDF

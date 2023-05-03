const { createReadStream } = require("fs")
const pdf = require("pdf-parse")

const resumePDFResolver = {
  Mutation: {
    extractTextFromPDF: async (_, { file }, { driver }) => {
      try {
        const { createReadStream } = await file
        const stream = createReadStream()
        const data = await pdf(stream)
        // return data.text
        return "hi"
      } catch (error) {
        console.error(error)
        throw new Error("Unable to extract text from PDF")
      }
    },
  },
}

module.exports = resumePDFResolver

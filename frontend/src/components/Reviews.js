import React from "react"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"

import { useMutation, gql } from "@apollo/client"

const CREATE_REVIEW = gql`
  mutation CreateReview(
    $Name: String!
    $Review: String!
  ) {
    createReview(
      Name: $name
      Review: $review
    ) {
      Name
      Review
    }
  }
`

function NewReviewForm() {
    const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW)

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        console.log({
            name: formData.get("name"),
            review: formData.get("review"),
        })
        createReview({
            variables: {
                name: formData.get("name"),
                review: formData.get("review"),
            },
        })
    }
    return (
        <Box sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5">
                Create a New Review
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    autoComplete="Name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    autoFocus
                    sx={{ mt: 2 }}
                />
                <TextField
                    autoComplete="Review"
                    name="review"
                    required
                    fullWidth
                    id="review"
                    label="review"
                    autoFocus
                    sx={{ mt: 2 }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default NewReviewForm
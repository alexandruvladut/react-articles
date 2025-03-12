import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateArticleMutation } from './articlesApi';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArticleForm } from './articleTypes';

const CreateArticle = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ArticleForm>();
  const [createArticle] = useCreateArticleMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ArticleForm) => {
    try {
      await createArticle(data).unwrap();
      navigate('/articles');
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Create Article
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{
            required: 'Title is required',
            minLength: { value: 5, message: 'Title must be at least 5 characters' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{
            required: 'Content is required',
            minLength: { value: 20, message: 'Content must be at least 20 characters' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Content"
              fullWidth
              multiline
              rows={4}
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="author"
          control={control}
          defaultValue=""
          rules={{ required: 'Author name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author"
              fullWidth
              error={!!errors.author}
              helperText={errors.author?.message}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Box mt={2}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateArticle;

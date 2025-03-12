import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGetArticleQuery, useUpdateArticleMutation } from './articlesApi';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress } from '@mui/material';
import { ArticleForm } from './articleTypes';

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, refetch } = useGetArticleQuery(id);
  const [updateArticle] = useUpdateArticleMutation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleForm>();

  useEffect(() => {
    if (article) {
      setValue('title', article.title);
      setValue('content', article.content);
      setValue('author', article.author);
    }
  }, [article, setValue]);

  const onSubmit = async (data: ArticleForm) => {
    try {
      await updateArticle({ id, ...data }).unwrap();
      await refetch();
      navigate('/articles');
    } catch (error) {
      console.error('Failed to update article:', error);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Edit Article
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
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditArticle;

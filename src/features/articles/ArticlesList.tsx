import React, { useState } from 'react';
import { useGetArticlesQuery, useDeleteArticleMutation } from './articlesApi';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Article } from './articleTypes';

const ArticlesList = () => {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading } = useGetArticlesQuery({ page, title: searchTerm });
  
  const [deleteArticle] = useDeleteArticleMutation();
  
  const navigate = useNavigate();

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [open, setOpen] = useState(false);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error fetching articles</Typography>;

  const articles = data?.content || [];
  const totalPages = data?.totalPages || 1;

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedArticle) {
      await deleteArticle(selectedArticle.id);
    }
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 2 }}>Articles</Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {articles.length === 0 ? (
        <Typography>No articles found.</Typography>
      ) : (
        <List>
          {articles.map((article: Article) => (
            <ListItem key={article.id} divider>
              <ListItemText
                primary={article.title}
                secondary={`By ${article.author} - ${new Date(article.createdAt).toLocaleString()}`}
              />
              <Button
                onClick={() => navigate(`/articles/${article.id}/edit`)}
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteClick(article)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{selectedArticle?.title}&quot;? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Pagination Controls */}
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          variant="contained"
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1">Page {page + 1} of {totalPages}</Typography>
        <Button
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
          variant="contained"
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ArticlesList;

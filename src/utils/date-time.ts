export const toLocalDate = (dateString: string = '') =>
  dateString
    ? new Date(dateString).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

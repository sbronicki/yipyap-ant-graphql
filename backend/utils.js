const formatDate = (_date) => {
  const date = new Date(_date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

module.exports.formatDate = formatDate;

exports.dashUser = (req, res) => {
  const { name, email } = res.currentUser;
  res.status(200).json({
    message: ` bonjour ${name} 
  Email: ${email}`,
  });
};
exports.dashAdmin = (req, res) => {
  const { name, email } = res.currentUser;
  res.status(200).json({
    message: ` bonjour ${name} 
  Email: ${email}`,
  });
};

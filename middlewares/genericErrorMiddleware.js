module.exports = (error, _req, res, _next) => {
console.log(error.message);
res.status(500).json({ message: 'erro inexperado' });
};
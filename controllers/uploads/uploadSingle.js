const DOMAIN = process.env.DOMAIN;

module.exports = {
  async importSingle (req, res) {
    console.log(req)
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Please upload a file!" });
      }
      const image = req.file;
      return res.status(201).json({
        data: {
          url_image: `${DOMAIN}/uploads/images/${image.filename}`
        },
        message: 'Image uploaded successfully'
    });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error! Try again, please!' })
    }
  },
}

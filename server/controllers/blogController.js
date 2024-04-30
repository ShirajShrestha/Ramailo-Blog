import Blog from "../models/blog.js";
import Category from "../models/category.js";

export const postBlog = async (req, res) => {
  const { title, content, author, categoryId, tags } = req.body;

  try {
    const newBlog = new Blog({
      title: title,
      content: content,
      author: author,
      category: categoryId,
      tags: tags,
    });
    const savedBlog = await newBlog.save();
    return res
      .status(201)
      .json({ message: "Blog post created successfully", blog: savedBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("category").exec();
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("category").exec();
    return res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const editBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, categoryId, tags } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author,
        category: categoryId,
        tags,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    return res
      .status(200)
      .json({ message: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    return res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const blogs = await Blog.find({ category: categoryId })
      .populate("category")
      .exec();
    return res.status(200).json({ category, blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogsByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const blogs = await Blog.find({ tags: tag }).populate("category").exec();
    return res.status(200).json({ tag, blogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

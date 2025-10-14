// Validation middleware for product creation and updates

// Validate product creation
const validateProductCreation = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  // Check required fields
  if (!name || name.trim() === '') {
    errors.push('Name is required');
  }

  if (!description || description.trim() === '') {
    errors.push('Description is required');
  }

  if (price === undefined || price === null) {
    errors.push('Price is required');
  } else if (typeof price !== 'number' || price < 0) {
    errors.push('Price must be a positive number');
  }

  if (!category || category.trim() === '') {
    errors.push('Category is required');
  }

  if (inStock === undefined || inStock === null) {
    errors.push('inStock is required');
  } else if (typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean value');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  // If validation passes, proceed to next middleware/route handler
  next();
};

// Validate product update
const validateProductUpdate = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  // Check if at least one field is provided
  if (!name && !description && price === undefined && !category && inStock === undefined) {
    return res.status(400).json({
      message: 'At least one field must be provided for update',
    });
  }

  // Validate name if provided
  if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
    errors.push('Name must be a non-empty string');
  }

  // Validate description if provided
  if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
    errors.push('Description must be a non-empty string');
  }

  // Validate price if provided
  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      errors.push('Price must be a positive number');
    }
  }

  // Validate category if provided
  if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
    errors.push('Category must be a non-empty string');
  }

  // Validate inStock if provided
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean value');
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  // If validation passes, proceed to next middleware/route handler
  next();
};

module.exports = { validateProductCreation, validateProductUpdate};
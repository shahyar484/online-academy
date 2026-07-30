module.exports = function slugify(text) {

    if (!text) return '';

    return text
        .toString()
        .trim()
        .toLowerCase()

        // حذف فاصله‌ها
        .replace(/\s+/g, '-')

        // حذف کاراکترهای غیرمجاز
        .replace(/[^\w\-]+/g, '')

        // حذف -- اضافی
        .replace(/\-\-+/g, '-')

        // حذف - ابتدا و انتها
        .replace(/^-+/, '')
        .replace(/-+$/, '');

};
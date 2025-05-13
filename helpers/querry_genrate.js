const querryGenerate = (data) => {
    let keys = Object.keys(data);
    return keys.join("=?,") + "=?";
};

module.exports = querryGenerate;
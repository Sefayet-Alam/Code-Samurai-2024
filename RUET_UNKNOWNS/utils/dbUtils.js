exports.parsePagingParameters = (req) => {
  let page;
  let itemsPerPage;
  try {
    page = parseInt(req.query.page) || 1;
    itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
  } catch (e) {
    console.log(e);
    page = 1;
    itemsPerPage = 10;
  }
  const skip = (page - 1) * itemsPerPage;
  return {
    page,
    itemsPerPage,
    skip,
  };
};

exports.generateUniqueRandomNumber = async (MODEL) => {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a random 10-digit number
  // Check whether this serial is in use or not
  const isSerialInUse = await MODEL.findOne({ serial: randomNumber });

  // recurse until isSerialInUse becomes false
  if (isSerialInUse) {
    console.log("Serial is in use. Recursing...");
    return await generateUniqueRandomNumber(MODEL);
  } else {
    return randomNumber;
  }
};

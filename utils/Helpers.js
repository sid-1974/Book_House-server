const UserModel = require("../models/user");

async function generateSequentialUserId() {
  try {
    // Find all users and sort by userid in descending order
    const users = await UserModel.find({ userid: { $exists: true, $ne: null } }).sort({ userid: -1 });
    
    if (users.length === 0) {
      // No users exist, start with BHU0001
      return "BHU0001";
    }
    
    // Find the highest userid in the database
    let maxUserId = "BHU0000";
    for (const user of users) {
      if (user.userid && user.userid > maxUserId) {
        maxUserId = user.userid;
      }
    }
    
    // Extract the numeric part and increment
    const numericPart = parseInt(maxUserId.replace("BHU", ""), 10);
    const nextNumericPart = numericPart + 1;
    
    // Format with leading zeros
    const nextUserId = "BHU" + nextNumericPart.toString().padStart(4, "0");
    
    return nextUserId;
  } catch (error) {
    console.error("Error generating user ID:", error);
    // Fallback to timestamp-based ID if there's an error
    return "BHU" + Date.now().toString().slice(-4);
  }
}

module.exports = { generateSequentialUserId };
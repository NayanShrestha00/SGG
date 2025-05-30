import { User } from "../../models/user.model.js";
import bcryptjs from "bcryptjs";
import { Admin } from "../../models/admin.model.js";
import { Manager } from "../../models/manager.model.js";
import { utils } from "../../utils/index.js";
const { apiError, apiResponse } = utils;

const getUserModel = (userId) => {
  let role = userId.role;
  console.log(role);
  
  if (!role) role = "User";

  if (!["User", "Manager", "Admin"].includes(role)) {
    throw new apiError({
      statusCode: 400,
      message: "Invalid role specified",
    });
  }
  switch (role) {
    case "Admin":
      return Admin;
      break;
    case "Manager":
      return Manager;
      break;
    default:
      return User;
      break;
  }
};

const verifyEmail = async (code, userId) => {
  try {
    if (userId) {
      return changeEmailVerification(code, userId);
    } else {
      return verifyEmailRegstration(code);
    }
  } catch (error) {
    throw error;
  }
};

async function changeEmailVerification(data, userId) {
  try {
    const { code } = data;
    console.log(code);

    if (!code) {
      throw new apiError({
        statusCode: 400,
        message: "code is required",
      });
    }

    const selectedModel = getUserModel(userId);
    console.log(selectedModel);
    

    if (!userId) {
      throw new apiError({
        statusCode: 400,
        message: "invalid user",
      });
    }

    const user = await selectedModel.findById(userId);
  
    
    if (!user) {
      throw new apiError({
        statusCode: 400,
        message: "User not found",
      });
    }

    if (user.isverified === true) {
      throw new apiResponse({
        statusCode: 201,
        message: "already verified",
      });
    }

    // Ensure the verification code exists for the user
    if (!user.verificationCode) {
      console.log("No verification code found for this user:", user);
      throw new apiError({
        statusCode: 400,
        message: "Verification code is not found for this user",
      });
    }

    const isValidCode = await bcryptjs.compare(code, user.verificationCode);
    console.log(isValidCode);
    

    if (!isValidCode) {
      throw new apiError({
        statusCode: 400,
        message: "Invalid verification code",
      });
    }

    // Check if the verification code has expired
    if (new Date() > user.verificationCodeExpire) {
      // If expired, clear the verification code and expiration time
      user.verificationCode = undefined;
      user.verificationCodeExpire = undefined;
      await user.save();

      // Throw error indicating that the verification code has expired
      throw new apiError({
        statusCode: 400,
        message: "Verification code has expired",
      });
    }

    // Mark the user as verified and remove the verification code
    user.isverified = true;
    user.isEmailUpdating = false;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;
    await user.save(); 
  } catch (error) {
    throw error;
  }
}

async function verifyEmailRegstration(userData) {
  const { code, email } = userData;
  if (!code) {
    throw new apiError({
      statusCode: 400,
      message: "Verification code is required",
    });
  }
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new apiError({
      statusCode: 400,
      message: "User not found",
    });
  }
  //already verified
  if (user.isverified === true) {
    throw new apiResponse({
      statusCode: 201,
      message: "User already verified",
    });
  }
  if (!user.verificationCode) {
    throw new apiError({
      statusCode: 400,
      message: "Verification code is not found for this user",
    });
  }
  //hashed verification code with the user input
  const isValidCode = await bcryptjs.compare(code, user.verificationCode);

  if (!isValidCode) {
    throw new apiError({
      statusCode: 400,
      message: "Invalid verification code",
    });
  }

  // Check if the verification code has expired
  if (new Date() > user.verificationCodeExpire) {
    // If expired, clear the verification code and expiration time
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;
    await user.save();

    // Throw error indicating that the verification code has expired
    throw new apiError({
      statusCode: 400,
      message: "Verification code has expired",
    });
  }

  // Mark the user as verified and remove the verification code
  user.isverified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpire = undefined;
  await user.save();
}

export { verifyEmail };

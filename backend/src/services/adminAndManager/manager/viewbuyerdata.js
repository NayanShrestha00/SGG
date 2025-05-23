import { Buyproperty } from "../../../models/buy.property.model.js";
import { Post } from "../../../models/manager.post.model.js";
import { utils } from "../../../utils/index.js";
const { apiError } = utils;
import { middlewares } from "../../../middlewares/index.js";
const { stateUpdate } = middlewares;

//view all buyer data
const allform = async (managerId,filters,projection,options) => {
  try {
    //validate
    if (!managerId) {
      throw new apiError({
        statusCode: 400,
        message: "Invalid manager",
      });
    }

    //validate managar id with post manager id
    const extistForms = await Buyproperty.find(filters,projection,options)

    return extistForms;
  } catch (error) {
    throw error;
  }
};

//view the buyer request post
const viewbuyerData = async(postId)=> {
  try {
    //validate
    if (!postId) {
      throw new apiError({
        statusCode: 400,
        message: "invalid post id"
      })
    };
    const viewpost = await Post.findById(postId);
    return viewpost;

  } catch (error) {
    throw error;
  }
}

//update state
const buyerState = async(data,buyerId)=>{
  try {
    const {state}=data;
    const updateState = await stateUpdate(Buyproperty,state,buyerId);
  } catch (error) {
    throw error;
  }
}
export { allform,viewbuyerData,buyerState };

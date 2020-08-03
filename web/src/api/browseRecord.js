import service from '@/utils/request'

// @Tags UserBrowseRecord
// @Summary 创建UserBrowseRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserBrowseRecord true "创建UserBrowseRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /browseRecord/createUserBrowseRecord [post]
export const createUserBrowseRecord = (data) => {
     return service({
         url: "/browseRecord/createUserBrowseRecord",
         method: 'post',
         data
     })
 }


// @Tags UserBrowseRecord
// @Summary 删除UserBrowseRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserBrowseRecord true "删除UserBrowseRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /browseRecord/deleteUserBrowseRecord [delete]
 export const deleteUserBrowseRecord = (data) => {
     return service({
         url: "/browseRecord/deleteUserBrowseRecord",
         method: 'delete',
         data
     })
 }

// @Tags UserBrowseRecord
// @Summary 删除UserBrowseRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除UserBrowseRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /browseRecord/deleteUserBrowseRecord [delete]
 export const deleteUserBrowseRecordByIds = (data) => {
     return service({
         url: "/browseRecord/deleteUserBrowseRecordByIds",
         method: 'delete',
         data
     })
 }

// @Tags UserBrowseRecord
// @Summary 更新UserBrowseRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserBrowseRecord true "更新UserBrowseRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /browseRecord/updateUserBrowseRecord [put]
 export const updateUserBrowseRecord = (data) => {
     return service({
         url: "/browseRecord/updateUserBrowseRecord",
         method: 'put',
         data
     })
 }


// @Tags UserBrowseRecord
// @Summary 用id查询UserBrowseRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserBrowseRecord true "用id查询UserBrowseRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /browseRecord/findUserBrowseRecord [get]
 export const findUserBrowseRecord = (params) => {
     return service({
         url: "/browseRecord/findUserBrowseRecord",
         method: 'get',
         params
     })
 }


// @Tags UserBrowseRecord
// @Summary 分页获取UserBrowseRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取UserBrowseRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /browseRecord/getUserBrowseRecordList [get]
 export const getUserBrowseRecordList = (params) => {
     return service({
         url: "/browseRecord/getUserBrowseRecordList",
         method: 'get',
         params
     })
 }
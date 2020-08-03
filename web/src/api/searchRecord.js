import service from '@/utils/request'

// @Tags UserSearchRecord
// @Summary 创建UserSearchRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserSearchRecord true "创建UserSearchRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /searchRecord/createUserSearchRecord [post]
export const createUserSearchRecord = (data) => {
     return service({
         url: "/searchRecord/createUserSearchRecord",
         method: 'post',
         data
     })
 }


// @Tags UserSearchRecord
// @Summary 删除UserSearchRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserSearchRecord true "删除UserSearchRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /searchRecord/deleteUserSearchRecord [delete]
 export const deleteUserSearchRecord = (data) => {
     return service({
         url: "/searchRecord/deleteUserSearchRecord",
         method: 'delete',
         data
     })
 }

// @Tags UserSearchRecord
// @Summary 删除UserSearchRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除UserSearchRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /searchRecord/deleteUserSearchRecord [delete]
 export const deleteUserSearchRecordByIds = (data) => {
     return service({
         url: "/searchRecord/deleteUserSearchRecordByIds",
         method: 'delete',
         data
     })
 }

// @Tags UserSearchRecord
// @Summary 更新UserSearchRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserSearchRecord true "更新UserSearchRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /searchRecord/updateUserSearchRecord [put]
 export const updateUserSearchRecord = (data) => {
     return service({
         url: "/searchRecord/updateUserSearchRecord",
         method: 'put',
         data
     })
 }


// @Tags UserSearchRecord
// @Summary 用id查询UserSearchRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserSearchRecord true "用id查询UserSearchRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /searchRecord/findUserSearchRecord [get]
 export const findUserSearchRecord = (params) => {
     return service({
         url: "/searchRecord/findUserSearchRecord",
         method: 'get',
         params
     })
 }


// @Tags UserSearchRecord
// @Summary 分页获取UserSearchRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取UserSearchRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /searchRecord/getUserSearchRecordList [get]
 export const getUserSearchRecordList = (params) => {
     return service({
         url: "/searchRecord/getUserSearchRecordList",
         method: 'get',
         params
     })
 }
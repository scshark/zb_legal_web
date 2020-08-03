import service from '@/utils/request'

// @Tags UserDownloadRecord
// @Summary 创建UserDownloadRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserDownloadRecord true "创建UserDownloadRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /downloadRecord/createUserDownloadRecord [post]
export const createUserDownloadRecord = (data) => {
     return service({
         url: "/downloadRecord/createUserDownloadRecord",
         method: 'post',
         data
     })
 }


// @Tags UserDownloadRecord
// @Summary 删除UserDownloadRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserDownloadRecord true "删除UserDownloadRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /downloadRecord/deleteUserDownloadRecord [delete]
 export const deleteUserDownloadRecord = (data) => {
     return service({
         url: "/downloadRecord/deleteUserDownloadRecord",
         method: 'delete',
         data
     })
 }

// @Tags UserDownloadRecord
// @Summary 删除UserDownloadRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除UserDownloadRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /downloadRecord/deleteUserDownloadRecord [delete]
 export const deleteUserDownloadRecordByIds = (data) => {
     return service({
         url: "/downloadRecord/deleteUserDownloadRecordByIds",
         method: 'delete',
         data
     })
 }

// @Tags UserDownloadRecord
// @Summary 更新UserDownloadRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserDownloadRecord true "更新UserDownloadRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /downloadRecord/updateUserDownloadRecord [put]
 export const updateUserDownloadRecord = (data) => {
     return service({
         url: "/downloadRecord/updateUserDownloadRecord",
         method: 'put',
         data
     })
 }


// @Tags UserDownloadRecord
// @Summary 用id查询UserDownloadRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserDownloadRecord true "用id查询UserDownloadRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /downloadRecord/findUserDownloadRecord [get]
 export const findUserDownloadRecord = (params) => {
     return service({
         url: "/downloadRecord/findUserDownloadRecord",
         method: 'get',
         params
     })
 }


// @Tags UserDownloadRecord
// @Summary 分页获取UserDownloadRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取UserDownloadRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /downloadRecord/getUserDownloadRecordList [get]
 export const getUserDownloadRecordList = (params) => {
     return service({
         url: "/downloadRecord/getUserDownloadRecordList",
         method: 'get',
         params
     })
 }
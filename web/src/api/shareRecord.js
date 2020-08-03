import service from '@/utils/request'

// @Tags UserShareRecord
// @Summary 创建UserShareRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserShareRecord true "创建UserShareRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /shareRecord/createUserShareRecord [post]
export const createUserShareRecord = (data) => {
     return service({
         url: "/shareRecord/createUserShareRecord",
         method: 'post',
         data
     })
 }


// @Tags UserShareRecord
// @Summary 删除UserShareRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserShareRecord true "删除UserShareRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /shareRecord/deleteUserShareRecord [delete]
 export const deleteUserShareRecord = (data) => {
     return service({
         url: "/shareRecord/deleteUserShareRecord",
         method: 'delete',
         data
     })
 }

// @Tags UserShareRecord
// @Summary 删除UserShareRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除UserShareRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /shareRecord/deleteUserShareRecord [delete]
 export const deleteUserShareRecordByIds = (data) => {
     return service({
         url: "/shareRecord/deleteUserShareRecordByIds",
         method: 'delete',
         data
     })
 }

// @Tags UserShareRecord
// @Summary 更新UserShareRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserShareRecord true "更新UserShareRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /shareRecord/updateUserShareRecord [put]
 export const updateUserShareRecord = (data) => {
     return service({
         url: "/shareRecord/updateUserShareRecord",
         method: 'put',
         data
     })
 }


// @Tags UserShareRecord
// @Summary 用id查询UserShareRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserShareRecord true "用id查询UserShareRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /shareRecord/findUserShareRecord [get]
 export const findUserShareRecord = (params) => {
     return service({
         url: "/shareRecord/findUserShareRecord",
         method: 'get',
         params
     })
 }


// @Tags UserShareRecord
// @Summary 分页获取UserShareRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取UserShareRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /shareRecord/getUserShareRecordList [get]
 export const getUserShareRecordList = (params) => {
     return service({
         url: "/shareRecord/getUserShareRecordList",
         method: 'get',
         params
     })
 }
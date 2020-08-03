import service from '@/utils/request'

// @Tags UserLabel
// @Summary 创建UserLabel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserLabel true "创建UserLabel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /userLabel/createUserLabel [post]
export const createUserLabel = (data) => {
     return service({
         url: "/userLabel/createUserLabel",
         method: 'post',
         data
     })
 }


// @Tags UserLabel
// @Summary 删除UserLabel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserLabel true "删除UserLabel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /userLabel/deleteUserLabel [delete]
 export const deleteUserLabel = (data) => {
     return service({
         url: "/userLabel/deleteUserLabel",
         method: 'delete',
         data
     })
 }

// @Tags UserLabel
// @Summary 删除UserLabel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除UserLabel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /userLabel/deleteUserLabel [delete]
 export const deleteUserLabelByIds = (data) => {
     return service({
         url: "/userLabel/deleteUserLabelByIds",
         method: 'delete',
         data
     })
 }

// @Tags UserLabel
// @Summary 更新UserLabel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserLabel true "更新UserLabel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /userLabel/updateUserLabel [put]
 export const updateUserLabel = (data) => {
     return service({
         url: "/userLabel/updateUserLabel",
         method: 'put',
         data
     })
 }


// @Tags UserLabel
// @Summary 用id查询UserLabel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.UserLabel true "用id查询UserLabel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /userLabel/findUserLabel [get]
 export const findUserLabel = (params) => {
     return service({
         url: "/userLabel/findUserLabel",
         method: 'get',
         params
     })
 }


// @Tags UserLabel
// @Summary 分页获取UserLabel列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取UserLabel列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /userLabel/getUserLabelList [get]
 export const getUserLabelList = (params) => {
     return service({
         url: "/userLabel/getUserLabelList",
         method: 'get',
         params
     })
 }
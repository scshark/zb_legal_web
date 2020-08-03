import service from '@/utils/request'

// @Tags ZbUser
// @Summary 创建ZbUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZbUser true "创建ZbUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zbUser/createZbUser [post]
export const createZbUser = (data) => {
     return service({
         url: "/zbUser/createZbUser",
         method: 'post',
         data
     })
 }


// @Tags ZbUser
// @Summary 删除ZbUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZbUser true "删除ZbUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zbUser/deleteZbUser [delete]
 export const deleteZbUser = (data) => {
     return service({
         url: "/zbUser/deleteZbUser",
         method: 'delete',
         data
     })
 }

// @Tags ZbUser
// @Summary 删除ZbUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ZbUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zbUser/deleteZbUser [delete]
 export const deleteZbUserByIds = (data) => {
     return service({
         url: "/zbUser/deleteZbUserByIds",
         method: 'delete',
         data
     })
 }

// @Tags ZbUser
// @Summary 更新ZbUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZbUser true "更新ZbUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /zbUser/updateZbUser [put]
 export const updateZbUser = (data) => {
     return service({
         url: "/zbUser/updateZbUser",
         method: 'put',
         data
     })
 }


// @Tags ZbUser
// @Summary 用id查询ZbUser
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZbUser true "用id查询ZbUser"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /zbUser/findZbUser [get]
 export const findZbUser = (params) => {
     return service({
         url: "/zbUser/findZbUser",
         method: 'get',
         params
     })
 }


// @Tags ZbUser
// @Summary 分页获取ZbUser列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取ZbUser列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zbUser/getZbUserList [get]
 export const getZbUserList = (params) => {
     return service({
         url: "/zbUser/getZbUserList",
         method: 'get',
         params
     })
 }
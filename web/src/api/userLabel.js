import service from '@/utils/request'

// @Tags Label
// @Summary 创建Label
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Label true "创建Label"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /label/createLabel [post]
export const createLabel = (data) => {
     return service({
         url: "/label/createLabel",
         method: 'post',
         data
     })
 }


// @Tags Label
// @Summary 删除Label
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Label true "删除Label"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /label/deleteLabel [delete]
 export const deleteLabel = (data) => {
     return service({
         url: "/label/deleteLabel",
         method: 'delete',
         data
     })
 }

// @Tags Label
// @Summary 删除Label
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Label"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /label/deleteLabel [delete]
 export const deleteLabelByIds = (data) => {
     return service({
         url: "/label/deleteLabelByIds",
         method: 'delete',
         data
     })
 }

// @Tags Label
// @Summary 更新Label
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Label true "更新Label"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /label/updateLabel [put]
 export const updateLabel = (data) => {
     return service({
         url: "/label/updateLabel",
         method: 'put',
         data
     })
 }


// @Tags Label
// @Summary 用id查询Label
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Label true "用id查询Label"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /label/findLabel [get]
 export const findLabel = (params) => {
     return service({
         url: "/label/findLabel",
         method: 'get',
         params
     })
 }


// @Tags Label
// @Summary 分页获取Label列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取Label列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /label/getLabelList [get]
 export const getLabelList = (params) => {
     return service({
         url: "/label/getLabelList",
         method: 'get',
         params
     })
 }
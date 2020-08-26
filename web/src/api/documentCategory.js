import service from '@/utils/request'

// @Tags DocumentCategory
// @Summary 创建DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentCategory true "创建DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docCategory/createDocumentCategory [post]
export const createDocumentCategory = (data) => {
     return service({
         url: "/docCategory/createDocumentCategory",
         method: 'post',
         data
     })
 }


// @Tags DocumentCategory
// @Summary 删除DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentCategory true "删除DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /docCategory/deleteDocumentCategory [delete]
 export const deleteDocumentCategory = (data) => {
     return service({
         url: "/docCategory/deleteDocumentCategory",
         method: 'delete',
         data
     })
 }

// @Tags DocumentCategory
// @Summary 删除DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /docCategory/deleteDocumentCategory [delete]
 export const deleteDocumentCategoryByIds = (data) => {
     return service({
         url: "/docCategory/deleteDocumentCategoryByIds",
         method: 'delete',
         data
     })
 }

// @Tags DocumentCategory
// @Summary 更新DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentCategory true "更新DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /docCategory/updateDocumentCategory [put]
 export const updateDocumentCategory = (data) => {
     return service({
         url: "/docCategory/updateDocumentCategory",
         method: 'put',
         data
     })
 }


// @Tags DocumentCategory
// @Summary 用id查询DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentCategory true "用id查询DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /docCategory/findDocumentCategory [get]
 export const findDocumentCategory = (params) => {
     return service({
         url: "/docCategory/findDocumentCategory",
         method: 'get',
         params
     })
 }


// @Tags DocumentCategory
// @Summary 分页获取DocumentCategory列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取DocumentCategory列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docCategory/getDocumentCategoryList [get]
 export const getDocumentCategoryList = (params) => {
     return service({
         url: "/docCategory/getDocumentCategoryList",
         method: 'get',
         params
     })
 }
import service from '@/utils/request'

// @Tags DocumentKeyword
// @Summary 创建DocumentKeyword
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentKeyword true "创建DocumentKeyword"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docKeyword/createDocumentKeyword [post]
export const createDocumentKeyword = (data) => {
     return service({
         url: "/docKeyword/createDocumentKeyword",
         method: 'post',
         data
     })
 }


// @Tags DocumentKeyword
// @Summary 删除DocumentKeyword
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentKeyword true "删除DocumentKeyword"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /docKeyword/deleteDocumentKeyword [delete]
 export const deleteDocumentKeyword = (data) => {
     return service({
         url: "/docKeyword/deleteDocumentKeyword",
         method: 'delete',
         data
     })
 }

// @Tags DocumentKeyword
// @Summary 删除DocumentKeyword
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DocumentKeyword"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /docKeyword/deleteDocumentKeyword [delete]
 export const deleteDocumentKeywordByIds = (data) => {
     return service({
         url: "/docKeyword/deleteDocumentKeywordByIds",
         method: 'delete',
         data
     })
 }

// @Tags DocumentKeyword
// @Summary 更新DocumentKeyword
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentKeyword true "更新DocumentKeyword"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /docKeyword/updateDocumentKeyword [put]
 export const updateDocumentKeyword = (data) => {
     return service({
         url: "/docKeyword/updateDocumentKeyword",
         method: 'put',
         data
     })
 }


// @Tags DocumentKeyword
// @Summary 用id查询DocumentKeyword
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentKeyword true "用id查询DocumentKeyword"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /docKeyword/findDocumentKeyword [get]
 export const findDocumentKeyword = (params) => {
     return service({
         url: "/docKeyword/findDocumentKeyword",
         method: 'get',
         params
     })
 }


// @Tags DocumentKeyword
// @Summary 分页获取DocumentKeyword列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取DocumentKeyword列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docKeyword/getDocumentKeywordList [get]
 export const getDocumentKeywordList = (params) => {
     return service({
         url: "/docKeyword/getDocumentKeywordList",
         method: 'get',
         params
     })
 }
import service from '@/utils/request'

// @Tags Document
// @Summary 创建通用文书
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "创建热搜文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/addGenericDocument [post]
export const addGenericDocument = (data) => {
    return service({
        url: "/doc/addGenericDocument",
        method: 'post',
        data
    })
}


// @Tags Document
// @Summary 删除通用文书（单删）
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "删除通用文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /doc/deleteGenericDoc [delete]
export const deleteGenericDoc = (data) => {
    return service({
        url: "/doc/deleteGenericDoc",
        method: 'delete',
        data
    })
}


// @Tags Document
// @Summary 删除通用文书（批量）
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除通用文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /doc/deleteGenericDocByIds [delete]
export const deleteGenericDocByIds = (data) => {
    return service({
        url: "/doc/deleteGenericDocByIds",
        method: 'delete',
        data
    })
}


// @Tags Document
// @Summary 更新通用文书
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "更新通用文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /doc/updateGenericDoc [put]
export const updateGenericDoc = (data) => {
    return service({
        url: "/doc/updateGenericDoc",
        method: 'put',
        data
    })
}


// @Tags Document
// @Summary 分页获取通用文书列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取通用文书列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/getGenericDocumentList [get]
export const getGenericDocumentList = (params) => {
    return service({
        url: "/doc/getGenericDocumentList",
        method: 'get',
        params
    })
}


// @Tags Document
// @Summary 分页获取选择文书列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取选择文书列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/getGenericDocPickList [get]
export const getGenericDocPickList = (data) => {
    return service({
        url: "/doc/getGenericDocPickList",
        method: 'post',
        data
    })
}
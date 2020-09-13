import service from '@/utils/request'

// @Tags Document
// @Summary 创建Document
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "创建Document"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/createDocument [post]
export const createDocument = (data) => {
    return service({
        url: "/doc/createDocument",
        method: 'post',
        data
    })
}


// @Tags Document
// @Summary 删除Document
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "删除Document"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /doc/deleteDocument [delete]
export const deleteDocument = (data) => {
    return service({
        url: "/doc/deleteDocument",
        method: 'delete',
        data
    })
}

// @Tags Document
// @Summary 删除Document
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Document"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /doc/deleteDocument [delete]
export const deleteDocumentByIds = (data) => {
    return service({
        url: "/doc/deleteDocumentByIds",
        method: 'delete',
        data
    })
}

// @Tags Document
// @Summary 更新Document
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "更新Document"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /doc/updateDocument [put]
export const updateDocument = (data) => {
    return service({
        url: "/doc/updateDocument",
        method: 'put',
        data
    })
}


// @Tags Document
// @Summary 用id查询Document
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "用id查询Document"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /doc/findDocument [get]
export const findDocument = (params) => {
    return service({
        url: "/doc/findDocument",
        method: 'get',
        params
    })
}


// @Tags Document
// @Summary 用id查询Document已选中的分类
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "用id查询Document已选中的分类"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /doc/findDocument [get]
export const findDocumentClass = (params) => {
    return service({
        url: "/doc/getAllCategoryByDoc",
        method: 'get',
        params
    })
}

// @Tags Document
// @Summary 查询所有的分类分类
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "查询所有的分类分类"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /doc/findDocument [get]
export const getAllCategory = (params) => {
    return service({
        url: "/docCategory/getAllCategory",
        method: 'get',
    })
}


// @Tags Document
// @Summary 分页获取Document列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取Document列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/getDocumentList [get]
export const getDocumentList = (params) => {
    return service({
        url: "/doc/getDocumentList",
        method: 'get',
        params
    })
}
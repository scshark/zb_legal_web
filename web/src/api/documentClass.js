import service from '@/utils/request'

// @Tags deleteDocumentClass
// @Summary 创建DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.deleteDocumentClass true "创建DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docClass/createDocumentClass [post]
export const createDocumentClass = (data) => {
    return service({
        url: "/docClass/createDocumentClass",
        method: 'post',
        data
    })
}


// @Tags deleteDocumentClass
// @Summary 删除deleteDocumentClass
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.deleteDocumentClass true "删除DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /docClass/deleteDocumentClass [delete]
export const deleteDocumentClass = (data) => {
    return service({
        url: "/docClass/deleteDocumentClass",
        method: 'delete',
        data
    })
}

// @Tags deleteDocumentClass
// @Summary 删除DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /docClass/deleteDocumentClassByIds [delete]
export const deleteDocumentClassByIds = (data) => {
    return service({
        url: "/docClass/deleteDocumentClassByIds",
        method: 'delete',
        data
    })
}

// @Tags DocumentClass
// @Summary 更新DocumentClass
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentClass true "更新DocumentCategory"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /docClass/updateDocumentClass [put]
export const updateDocumentClass = (data) => {
    return service({
        url: "/docClass/updateDocumentClass",
        method: 'put',
        data
    })
}


// @Tags DocumentClass
// @Summary 用id查询DocumentCategory
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DocumentClass true "用id查询DocumentClass"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /docClass/findDocumentClass [get]
export const findDocumentClass = (params) => {
    return service({
        url: "/docClass/findDocumentClass",
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
// @Router /docClass/getDocumentClassList [get]
export const getDocumentClassList = (params) => {
    return service({
        url: "/docClass/getDocumentClassList",
        method: 'get',
        params
    })
}
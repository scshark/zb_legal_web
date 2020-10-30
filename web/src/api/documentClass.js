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


// @Tags getDocumentClassList
// @Summary 分页获取getDocumentClassList列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取getDocumentClassList列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docClass/getDocumentClassList [get]
export const getDocumentClassList = (params) => {
    return service({
        url: "/docClass/getDocumentClassList",
        method: 'get',
        params
    })
}

// @Tags getDocumentByPickList
// @Summary 分页获取getDocumentByPickList列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取getDocumentByPickList列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docClass/getDocumentClassList [get]
export const getDocumentByPickList = (params) => {
    return service({
        url: "/doc/getDocumentByPickList",
        method: 'get',
        params
    })
}

// @Tags classBindDocument
// @Summary classBindDocument
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "classBindDocument"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docClass/classBindDocument [get]
export const classBindDocument = (data) => {
    return service({
        url: "/docClass/classBindDocument",
        method: 'post',
        data
    })
}

// @Tags getClassBoundList
// @Summary getClassBoundList
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "getClassBoundList"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docClass/getClassBoundList [get]
export const getClassBoundList = (params) => {
    return service({
        url: "/docClass/getClassBoundList",
        method: 'get',
        params
    })
}

// @Tags classUnbindDocument
// @Summary classUnbindDocument
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "classUnbindDocument"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /docClass/classUnbindDocument [get]
export const classUnbindDocument = (data) => {
    return service({
        url: "/docClass/classUnbindDocument",
        method: 'post',
        data
    })
}
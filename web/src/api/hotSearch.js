import service from '@/utils/request'

// @Tags Document
// @Summary 创建热搜文书
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "创建热搜文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/createDocument [post]
export const createHotSearch = (data) => {
    return service({
        url: "/doc/createHotSearch",
        method: 'post',
        data
    })
}


// @Tags Document
// @Summary 删除热搜文书（单删）
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "删除热搜文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /doc/deleteDocument [delete]
export const deleteHotSearch = (data) => {
    return service({
        url: "/doc/deleteHotSearch",
        method: 'delete',
        data
    })
}


// @Tags Document
// @Summary 删除热搜文书（批量）
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除热搜文书"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /doc/deleteDocument [delete]
export const deleteHotSearchByIds = (data) => {
    return service({
        url: "/doc/deleteHotSearchByIds",
        method: 'delete',
        data
    })
}


// @Tags Document
// @Summary 更新文书排序
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Document true "更新文书排序"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /doc/updateDocument [put]
export const updateHotSearchSort = (data) => {
    return service({
        url: "/doc/updateHotSearchSort",
        method: 'put',
        data
    })
}


// @Tags Document
// @Summary 分页获取热搜文书列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取热搜文书列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /doc/getHotSearchList [get]
export const getHotSearchList = (params) => {
    return service({
        url: "/doc/getHotSearchList",
        method: 'get',
        params
    })
}
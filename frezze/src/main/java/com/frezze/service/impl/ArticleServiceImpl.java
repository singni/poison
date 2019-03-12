package com.frezze.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.frezze.dao.ArticleDao;
import com.frezze.service.ArticleService;
import com.frezze.util.CommonUtil;
import com.frezze.util.constants.Constants;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author: hxy
 * @date: 2017/10/24 16:07
 */
@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleDao articleDao;


    /**
     * 新增文章
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public JSONObject addArticle(JSONObject jsonObject) {

       String username= Constants.getUserName();
       String content= (String) jsonObject.get("content");
        String summery= (String) jsonObject.get("content");
       if(content.length()>50)
           summery= content.substring(0,50);
        jsonObject.put("createby", username);
        jsonObject.put("summary",summery);
        articleDao.addArticle(jsonObject);
        return CommonUtil.successJson();
    }

    /**
     * 文章列表
     */
    @Override
    public JSONObject listArticle(JSONObject jsonObject) {
        CommonUtil.fillPageParam(jsonObject);
        String username= Constants.getUserName();
        jsonObject.put("createby", username);
        int count = articleDao.countArticle(jsonObject);
        List<JSONObject> list = articleDao.listArticle(jsonObject);
        return CommonUtil.successPage(jsonObject, list, count);
    }

    /**
     * 更新文章
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public JSONObject updateArticle(JSONObject jsonObject) {
        articleDao.updateArticle(jsonObject);
        return CommonUtil.successJson();
    }

    @Override
    public JSONObject deleteArticle(JSONObject requestJson) {
        articleDao.deleteArticle(requestJson);
        return CommonUtil.successJson();
    }


}

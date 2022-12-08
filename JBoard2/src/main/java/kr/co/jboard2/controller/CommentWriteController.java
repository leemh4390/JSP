package kr.co.jboard2.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import kr.co.jboard2.dao.ArticleDAO;
import kr.co.jboard2.vo.ArticleVO;

@WebServlet("/commentWrite.do")
public class CommentWriteController extends HttpServlet{

	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/view.jsp");
		dispatcher.forward(req, resp);
		
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		//데이터 수신
		String parent = req.getParameter("parent");
		String content = req.getParameter("content");
		String uid = req.getParameter("uid");
		String regip = req.getRemoteAddr();
		
		//데이터 생성
		ArticleVO comment = new ArticleVO();
		comment.setParent(parent);
		comment.setContent(content);
		comment.setUid(uid);
		comment.setRegip(regip);
		
		//데이터 베이스 처리
		ArticleVO article = ArticleDAO.getInstance().insertComment(comment);
		
		req.setAttribute("article", article);
		
		//json 출력
		JsonObject json = new JsonObject();
		json.addProperty("result", 1);
		json.addProperty("no", article.getNo());
		json.addProperty("parent", article.getParent());
		json.addProperty("nick", article.getNick());
		json.addProperty("date", article.getRdate());
		json.addProperty("content", article.getContent());
		
		PrintWriter writer = resp.getWriter();
		writer.print(json.toString());
		
	}
}

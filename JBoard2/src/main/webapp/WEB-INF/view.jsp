<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="./_header.jsp"/>
<script>

	$(document).ready(function(){

		// 댓글쓰기
		$('.commentForm > form').submit(function(){
			
			let pg 		= $(this).children('input[name=pg]').val();
			let parent 	= $(this).children('input[name=parent]').val();
			let uid 	= $(this).children('input[name=uid]').val();
			let textarea = $(this).children('textarea[name=content]');
			let content  = textarea.val();
						
			let jsonData = {
				"pg":pg,
				"parent":parent,
				"uid":uid,
				"content":content
			};
			
			console.log(jsonData);
			
			$.ajax({
				url : '/JBoard2/commentWrite.do',
				method: 'POST',
				data: jsonData,
				dataType: 'json',
				success: function(data){
					
					console.log(data);
					
					let article = "<article>";
						article += "<span class='nick'>"+data.nick+"</span>";
						article += "<span class='date'>"+data.date+"</span>";
						article += "<p class='content'>"+data.content+"</p>";
						article += "<div>";
						article += "<a href='#' class='remove' data-no='"+data.no+"'>삭제</a>";
						article += "<a href='#' class='modify' data-no='"+data.no+"'>수정</a>";
						article += "</div>";
						article += "</article>";
					
					$('.commentList > .empty').hide();
					$('.commentList').append(article);
					textarea.val('');
				}
			});
			
			return false;
		});
	});	
	});
</script>
        <main id="board">
            <section class="view">
                
                <table border="0">
                    <caption>글보기</caption>
                    <tr>
                       <th>제목</th>
                        <td><input type="text" name="title" value="${article.title}" readonly/></td>
                    </tr>
                  <c:if test="${article.file > 0}">
                    <tr>
                        <th>파일</th>
                        <td><a href="/JBoard2/download.do?fno=${article.fno }">${article.oriName}&nbsp;<span>${article.download}</span>회 다운로드</td>
                    </tr>
                     </c:if>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea name="content" readonly>${article.content }</textarea>
                        </td>
                    </tr>                    
                </table>
                
                <div>
                    <a href="#" class="btn btnRemove">삭제</a>
                    <a href="./modify.html" class="btn btnModify">수정</a>
                    <a href="./list.do" class="btn btnList">목록</a>
                </div>

                <!-- 댓글목록 -->
                <section class="commentList">
                    <h3>댓글목록</h3>                   

                    <article>
                        <span class="nick">길동이</span>
                        <span class="date">20-05-20</span>
                        <p class="content">댓글 샘플 입니다.</p>                        
                        <div>
                            <a href="#" class="remove">삭제</a>
                            <a href="#" class="modify">수정</a>
                        </div>
                    </article>

                    <p class="empty">등록된 댓글이 없습니다.</p>

                </section>

                <!-- 댓글쓰기 -->
                <section class="commentForm">
                    <h3>댓글쓰기</h3>
                    <form action="#" method="post">
                    	<input type="hidden" name="pg" value="${article.pg }" >
                    	<input type="hidden" name="parent" value="${article.parent }">
                    	<input type="hidden" name="uid" value="${sessUser.uid }">
                        <textarea name="content">댓글내용 입력</textarea>
                        <div>
                            <a href="#" class="btn btnCancel">취소</a>
                            <input type="submit" value="작성완료" class="btn btnComplete"/>
                        </div>
                    </form>
                </section>

            </section>
        </main>
        <jsp:include page="./_footer.jsp"/>
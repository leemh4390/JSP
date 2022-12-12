<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:include page="_header.jsp"/>
<script src="/JBoard2/js/info.js"></script>

<main id="user">
    <section class="find findId">
        <form action="#ajax1" method="POST">
        	<input type="hidden" name="uid" value="${ sessUser.uid }"/>
            <table border="0">
                <caption>비밀번호 확인</caption>
                <tr>
                    <td>비밀번호</td>
                    <td><input type="password" name="pass" placeholder="비밀번호 입력"/></td>
                </tr>                        
            </table>                                        
        </form>
        
        <p>
            회원가입시 정보를 보호하기 위해 비밀번호를 다시 확인합니다.<br>
        </p>

        <div>
            <a href="/JBoard2/list.do" class="btn btnCancel">취소</a>
            <a href="#ajax1" class="btn btnNext">다음</a>
        </div>
    </section>
</main>
<jsp:include page="_footer.jsp"/>
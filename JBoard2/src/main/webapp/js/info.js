let regPass = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
let regNick = /^[가-힣A-Za-z0-9]{2,10}$/;
let regHp 	= /^\d{3}-\d{3,4}-\d{4}$/;

let isNickChanged = true;
let isEmailChanged = true; 

$(function(){
	
	// #info.jsp
	$('.btnNext').click(function(e){
		e.preventDefault();
		let uid = $('input[name=uid]').val();
		let pass = $('input[name=pass]').val();
		
		$.ajax({
			url : '/JBoard2/user/info.do',
			method : 'POST',
			data : {"uid" : uid, "pass" : pass},
			dataType: 'json',
			success : function(data){
				if(data.result > 0){
					location.href="/JBoard2/user/myInfo.do";
				}else{
					alert('비밀번호가 일치하지 않습니다.');
				}
			}
		});
	});
	
	// ##myinfo.jsp
	// ###비밀번호변경
	$('.checkPass').focusout(function(){
		let pass1 = $('input[name=pass1]').val();
		let pass2 = $('input[name=pass2]').val();
		
		if(pass1 == pass2){
			if(pass1.match(regPass)){
				$('.passResult').css('color','green').text('비밀번호가 일치합니다.');
				isPassOk = true;
			}else{
				$('.passResult').css('color','red').text('');
			}
		}else{
			$('.passResult').css('color','red').text('비밀번호가 일치하지 않습니다.');
		}
	});
	//
	$('.btnChangePass').click(function(){
		
		let uid = $('input[name=uid]').val();
		let pass1 = $('input[name=pass1]').val();
		let pass2 = $('input[name=pass2]').val();
		
		if(pass1 != pass2){
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		if(!pass2.match(regPass)){
			alert('');
			return;
		}
				
		//성공시
		let jsonData = {
			"pass":pass2, 
			 "uid":uid
		}
		$.ajax({
			   url: '/JBoard2/user/findPwChange.do',
			method: 'POST',
			  data: jsonData,
		  dataType: 'json',
			success: function(data){
				if(data.result > 0){
					$('.passResult').css('color','green').text('비밀번호가 변경되었습니다.');
					$('input[name=pass1]').val('');
					$('input[name=pass2]').val('');
				}
			}
		});
	});
	
	// ### 회원탈퇴
	$('.btnCloseAccount').click(function(){
		let uid = $('input[name=uid]').val();
		$.ajax({
			url: '/JBoard2/user/closeAccount.do',
			method: 'GET',
			data: {"uid": uid},
			dataType: 'json',
			success: function(data){
				if(data.result > 0){
					alert('삭제되었습니다.');
					location.href="/JBoard2/user/logout.do?uid="+data.uid;
				}else{
					
				}
			}
		});
	});
	
	// ###회원정보설정
	// 닉네임
	$('input[name=nick]').keydown(function(){
		isNickChanged = false;
		$('.nickResult').text('');
	});
	
	$('#btnCheckNick').click(function(){
		isNickOk = false;
		let nick = $('input[name=nick]').val();
		if(!nick.match(regNick)){
			$('.nickResult').css('color','red').text('특수문자를 제외한 2~10글자로 지어주세요.');
			return;
		}
		$.ajax({
			url: '/JBoard2/user/checkNick.do',
			method: 'GET',
			data: {"nick":nick},
			dataType: 'json',
			success: function(data){
				if(data.result > 0){
					$('.nickResult').css('color','red').text('이미 사용중인 닉네임입니다.');
				}else{
					$('.nickResult').css('color','green').text('사용 가능한 닉네임입니다.');
					isNickChanged = true;
				}
			}
		});
	});
	// 이메일
	$('input[name=email]').keydown(function(){
		isEmailChanged = false;
	});
	
	$('#btnEmail').click(function(){
		let email = $('input[name=email]').val();
		
		if(email == ''){
			alert('이메일을 입력해주세요.');
			return;
		}
		
		$('.emailResult').text('인증코드 전송 중입니다. 잠시만 기다리세요...');
		
		setTimeout(function(){
			$.ajax({
				url: '/JBoard2/user/emailAuth.do',
				method: 'GET',
				data: {"email": email},
				dataType: 'json',
				success: function(data){
					if(data.status > 0){
						//메일전송 성공
						$('.emailResult').text('인증코드를 입력해주세요.');
						$('.auth').show();
						$('input[name=auth]').removeAttr("disabled")
						receivedCode = data.code;
					}else{
						//메일전송 실패
						$('.emailResult').text('다시 시도해주세요');
						alert('메일전송이 실패 했습니다. \n다시 시도 하시기 바랍니다.');
					}
				}
			});
		}, 1000);
	});
		
	$('#btnEmailConfirm').click(function(){
		let code = $('input[name=auth]').val();
		
		if(code == ''){
			alert('이메일 확인 후 코드를 입력해주세요.');
			return;
		}
		
		if(code == receivedCode){
			isEmailChanged = true;
			$('input[name=email]').attr('readonly', true);
			$('.emailResult').text('인증완료 되었습니다.');
			$('.auth').hide();
		}
	});
	
	
	// ##최종전송
	$('.register > form').submit(function(){
		//별명 검증
		if(!isNickChanged){
			alert('별명을 확인 하십시오.');
			return false;
		}
		//이메일 검증
		if(!isEmailChanged){
			alert('변경된 이메일을 인증해주세오.');
			return false;
		}
		
		//최종 전송
		return true;
	});
	
});
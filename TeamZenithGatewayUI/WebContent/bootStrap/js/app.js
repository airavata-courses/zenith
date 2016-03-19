$(document).ready(function () {
	$("#jobMonitorForm").submit(function (event) {

		$( "monitorResponse" ).empty();
		//disable the default form submission
		event.preventDefault();
		//grab all form data  
		var formData = new FormData();
		formData.append('username', $('#muser').val());
		formData.append('passPhrase', $('#mpass').val());
		formData.append('size', $('#jobID').val());
		formData.append('file', $('input[name=ppkFile]')[0].files[0]);

		var options = {
				"show" : "false"
		}

		$.ajax({
			dataType: "json",
			url: "http://localhost:8080/KarstShell-REST-Api-0.1.0/monitor",
			type: "POST",
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data, statusText, xhr) {
				if(xhr.status == 200){
					var content = JSON.stringify(data);
					$('#monitorResponse').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">&times</a><span><table class="table"><thead><tr><th>Job Name</th><th>Job owner</th><th>Job Status</th><th>Wall Time</th><th>Username</th></tr></thead><tbody><tr><td>'+data.jobname+'</td><td>'+data.name+'</td><td>'+data.jobstate+'</td><td>'+data.walltime+'</td><td>'+data.user+'</td></tr></tbody></table></span></div>');
				} else {
					var content = JSON.stringify(data);
					$('#monitorResponse').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+data.message+'</span></div>');
				}	
			},
			error: function(data,status){
				if(status == 400){
					var content = "Bad Request : Please verify the form details and retry";
					$('#monitorResponse').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				} else {
					var content = JSON.stringify(data);
					$('#monitorResponse').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				}
				
			}
		});

		return false;
	});

	$("#jobSubmitForm").submit(function (event) {

		$( "result" ).empty();
		//disable the default form submission
		event.preventDefault();

		var formData = new FormData();
		var filejob=[];
		if($('#jobType').val()=="cust"){
			filejob[0]=$('input[name=customfile]')[0].files[0];

		}
		else{
			filejob[0]=$('input[name=fileent]')[0].files[0];
			filejob[1]=$('input[name=filegro]')[0].files[0];
			filejob[2]=$('input[name=filetop]')[0].files[0];
			filejob[3]=$('input[name=filemdp]')[0].files[0];
			filejob[4]=$('input[name=filetpr]')[0].files[0];
		}
		formData.append('path', $('#targetPath').val());
		for (var i = 0; i < filejob.length; i++) {
			formData.append('filejob[]', filejob[i]);
		}

	/*	var ins = document.getElementById('file[1]').files.length;
		alert(ins);
		for (var x = 0; x < ins; x++) {
			formData.append("filejob[]", document.getElementById('file').files[x]);
		}
		
		/*var ins = $('input[name=file]')[0].files.length;

		for (var x = 0; x < ins; x++) {
			alert(ins);

			formData.append("filejob[]", $('input[name=file]')[0].files[x]);
		}
		*/
		formData.append('username', $('#userName').val());
		formData.append('jobname', $('#jobName').val());
		formData.append('noofnodes', $('#nodeCount').val());
		formData.append('noofppn', $('#ppn').val());
		formData.append('walltime', $('#wallTime').val());
		formData.append('compreq', $("input[name=isCompile]:checked").val());
		formData.append('email', $('#InputEmail').val());
		formData.append('file', $('input[name=ppk]')[0].files[0]);
		formData.append('pass', $('#passPhrase').val());
		formData.append('jType',$('#jobType').val());

		var options = {
				"show" : "false"
		}

		$.ajax({
			url: "http://localhost:8080/KarstShell-REST-Api-0.1.0/upload",
			type: "POST",
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data, statusText, xhr) {
				if(xhr.status != 200){
					var content = JSON.stringify(data);
					$('#result').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				} else {
					var content = JSON.stringify(data);
					$('#result').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				}
			},
			error: function(data, statusText, xhr){
				if(xhr.status == 400){
					var content = "Bad Request : Please verify the form details and retry";
					$('#result').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				} else {
					var content = JSON.stringify(data);
					$('#result').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				}

			}
		});

		return false;
	});

	$("#jobCancelForm").submit(function (event) {

		$( "cancelResponse" ).empty();
		//disable the default form submission
		event.preventDefault();
		//grab all form data  
		var formData = new FormData();
		formData.append('username', $('#canceluser').val());
		formData.append('passPhrase', $('#cancelpass').val());
		formData.append('jobnumber', $('#canceljobID').val());
		formData.append('file', $('input[name=cFile]')[0].files[0]);

		var options = {
				"show" : "false"
		}

		$.ajax({
			url: "http://localhost:8080/KarstShell-REST-Api-0.1.0/cancel",
			type: "POST",
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data, statusText, xhr) {
			if(xhr.status != 200){
					var content = JSON.stringify(data);
					$('#cancelResponse').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				} else {
					var content = JSON.stringify(data);
					$('#cancelResponse').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				}
			},
			error: function(data, statusText, xhr){
				if(xhr.status == 400){
					var content = "Bad Request : Please verify the form details and retry";
					$('#cancelResponse').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				} else {
					var content = JSON.stringify(data);
					$('#cancelResponse').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
				}

			}
		});

		return false;
	});

	$("#jobDownloadForm_invalid").submit(function (event) {

		$( "downloadResponse" ).empty();
		//disable the default form submission
		event.preventDefault();
		//grab all form data  
		var formData = new FormData();
		formData.append('username', $('#downloaduser').val());
		formData.append('passPhrase', $('#downloadpass').val());
		formData.append('jobName', $('#downloadjobName').val());
		formData.append('workPath', $('#downloadjobID').val());
		formData.append('file', $('input[name=cFile]')[0].files[0]);

		var options = {
				"show" : "false"
		}

		$.ajax({
			url: "http://localhost:8080/KarstShell-REST-Api-0.1.0/download",
			type: "POST",
			data: formData,
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function (data, statusText, xhr) {
				if(xhr.status != 200){
						var content = JSON.stringify(data);
						$('#downloadResponse').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>Click save on the prompt to download the output file in .zip package</span></div>');
					} else {
						var content = JSON.stringify(data);
						$('#downloadResponse').html('<div class="alert alert-success"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
					}
				},
				error: function(data, statusText, xhr){
					if(xhr.status == 400){
						var content = "Bad Request : Please verify the form details and retry";
						$('#downloadResponse').html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
					} else {
						var content = JSON.stringify(data);
						$('#downloadResponse').html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">&times</a><span>'+content+'</span></div>');
					}

				}
		});

		return false;
	});	
});
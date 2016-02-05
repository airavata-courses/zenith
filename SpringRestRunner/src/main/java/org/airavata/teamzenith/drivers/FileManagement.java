package org.airavata.teamzenith.drivers;

import java.io.IOException;

import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

public interface FileManagement {
	public boolean compileFile(Session session, String language, String artifact) throws IOException, JSchException;
	public boolean putFile(Session session, String localFile, String remotePath) throws IOException, JSchException;
	public boolean getFile(String localPath, String remoteFile);
}

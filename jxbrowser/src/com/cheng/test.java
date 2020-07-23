package com.cheng;

import java.awt.BorderLayout;
import java.awt.Frame;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigInteger;

import javax.swing.JFrame;

import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.JSFunction;
import com.teamdev.jxbrowser.chromium.JSValue;
import com.teamdev.jxbrowser.chromium.ba;
import com.teamdev.jxbrowser.chromium.swing.BrowserView;

public class test {
	static {
		try {
			Field e = ba.class.getDeclaredField("e");
			e.setAccessible(true);
			Field f = ba.class.getDeclaredField("f");
			f.setAccessible(true);
			Field modifersField = Field.class.getDeclaredField("modifiers");
			modifersField.setAccessible(true);
			modifersField.setInt(e, e.getModifiers() & ~Modifier.FINAL);
			modifersField.setInt(f, f.getModifiers() & ~Modifier.FINAL);
			e.set(null, new BigInteger("1"));
			f.set(null, new BigInteger("1"));
			modifersField.setAccessible(false);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}

	public static void main(String[] args) {
		
		Browser browser = new Browser();
		BrowserView view = new BrowserView(browser);

		JFrame frame = new JFrame();
		// ����close����
		// frame.setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
		// ����ʾ������,���,��С��,�˳���ť
		// frame.setUndecorated(true);
		frame.setSize(400, 600);
		frame.add(view, BorderLayout.CENTER);
		frame.setExtendedState(Frame.MAXIMIZED_BOTH);
		frame.setLocationByPlatform(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
		frame.setTitle("Test");
		browser.loadURL("file:///C:/dev/project/dmcheng/jxbrowser/resource/index.html");
		
	}
}

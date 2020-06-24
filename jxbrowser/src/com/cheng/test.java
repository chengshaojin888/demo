package com.cheng;

import com.teamdev.jxbrowser.chromium.Browser;
import com.teamdev.jxbrowser.chromium.ba;
import com.teamdev.jxbrowser.chromium.swing.BrowserView;

import javax.swing.*;
import java.awt.*;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigInteger;

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
		// final String url = "";
		final String title = "百度";
		Browser browser = new Browser();
		BrowserView view = new BrowserView(browser);

		JFrame frame = new JFrame();
		// 禁用close功能
		// frame.setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
		// 不显示标题栏,最大化,最小化,退出按钮
		// frame.setUndecorated(true);
		frame.setSize(400, 600);
		frame.add(view, BorderLayout.CENTER);
		frame.setExtendedState(Frame.MAXIMIZED_BOTH);
		frame.setLocationByPlatform(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
		browser.loadURL("file:///D:/test/index.html");

	}
}

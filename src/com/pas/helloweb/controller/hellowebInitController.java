package com.pas.helloweb.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.ModelMap;

@Controller

public class hellowebInitController {

	
		@RequestMapping("/")
		public String printHello(ModelMap model) {
	      model.addAttribute("message", "Hello Spring MVC Framework!");
	      System.out.println("INSIDE THE CONTROLLER");
	      return "hello";
	   }

}

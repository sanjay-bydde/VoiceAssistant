package com.example.VoiceAssistant.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.VoiceAssistant.Service.VoiceService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class VoiceController {

    private VoiceService voiceService;
	public VoiceController(VoiceService voiceservice)
	{
		this.voiceService = voiceservice;
	}


	@PostMapping("/voice")
    public ResponseEntity<String> handleVoice(@RequestBody String payload) {
        String userMessage = payload;
        String aiResponse = voiceService.generateResponse(userMessage);

        
        return ResponseEntity.ok("I'm doing great. How about you?");
    }
}
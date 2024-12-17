package com.example.instamail_backend.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.instamail_backend.model.Attachment;
import com.example.instamail_backend.service.MailsService.AttachmentService;

@RestController
public class AttachmentController {
    @Autowired
    private AttachmentService attachmentService;
     
    @PostMapping("/upload-attachment/{mailId}")
    public ResponseEntity<String> uploadAttachment(@RequestHeader("Authorization") String token, @PathVariable Long mailId, @RequestParam("files") List<MultipartFile> files) {
        try {   
            attachmentService.saveAttachment(files, mailId);
            return ResponseEntity.ok("Attachments uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
   @GetMapping("/download-attachment/{attachmentId}")
    public ResponseEntity<InputStreamResource> downloadAttachment(
            @RequestHeader("Authorization") String token, 
            @PathVariable Long attachmentId) throws IOException {

        
        Map<String,Object> response = attachmentService.getAttachmentById(attachmentId);
        File file = (File) response.get("file");
        String name = (String) response.get("name");

        // Prepare file input stream
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, name);
        headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(file.length()));

        // Return file as InputStreamResource
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM) // or MediaType.APPLICATION_PDF etc.
                .body(resource);
    }
    @GetMapping("/get-all-attachments/{mailId}")
    public ResponseEntity<?> getAttachmentsByMailId(@RequestHeader("Authorization") String token, @PathVariable Long mailId) {
        List<Attachment> attachments = attachmentService.getAttachmentsByMailId(mailId);
        return ResponseEntity.ok(attachments);
    }
}

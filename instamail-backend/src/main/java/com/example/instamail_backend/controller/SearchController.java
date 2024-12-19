package com.example.instamail_backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.instamail_backend.service.SearchService;

@RestController
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search/{searchTerm}")
    public ResponseEntity<?> searchMails(@RequestHeader("Authorization") String token,
            @PathVariable String searchTerm) {
        return ResponseEntity.ok(searchService.searchMails(token, searchTerm));
    }
}

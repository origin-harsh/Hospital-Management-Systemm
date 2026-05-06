package com.hms.media.service;

import java.io.IOException;
import java.util.Optional;

import javax.print.attribute.standard.Media;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hms.media.dto.MediaFileDTO;
import com.hms.media.entity.MediaFile;
import com.hms.media.entity.Storage;
import com.hms.media.respository.MediaFileRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional

public class MediaServoceImpl implements MediaService {

    private final MediaFileRepository mediaFileRepository;

    @Override
    public MediaFileDTO saveFile(MultipartFile file) throws IOException {
        MediaFile mediaFile = MediaFile.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .size(file.getSize())
                .data(file.getBytes())
                .storage(Storage.DB)
                .build();

           MediaFile savedFile = mediaFileRepository.save(mediaFile);
           return MediaFileDTO.builder()
                   .id(savedFile.getId())
                   .name(savedFile.getName())
                   .type(savedFile.getType())
                   .size(savedFile.getSize())
                   .build();    

    }

    @Override
    public Optional<MediaFile> getFile(Long id) {
        return mediaFileRepository.findById(id);
    }

   
    
}

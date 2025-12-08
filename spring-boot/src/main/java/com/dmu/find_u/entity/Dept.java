package com.dmu.find_u.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "dept")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dept {
    @Id
    private Integer id;

    @Column(nullable = false, length = 50, unique = true)
    private String name;

    @OneToMany(mappedBy = "dept")
    private List<UserInfo> users;
}
package com.dmu.find_u.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 255, unique = true)
    private String uid;

    @Column(nullable = false, length = 255, unique = true)
    private String phone;

    @Column(length = 255)
    private String number;

    @Column(nullable = false, length = 255)
    private String password;

    @ManyToOne
    @JoinColumn(name = "dept", referencedColumnName = "id", nullable = true)
    private Dept dept;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();


}
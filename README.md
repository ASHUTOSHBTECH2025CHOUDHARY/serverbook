package com.example.staff_service.controller;

import com.example.staff_service.dto.StaffDTO;
import com.example.staff_service.interfaces.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffControllers {

    @Autowired
    private IStaffService staffService;

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteById(@PathVariable Long id) {
        return ResponseEntity.ok(staffService.deleteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaffDTO> updateById(@PathVariable Long id, @RequestBody StaffDTO staffDTO) {
        return ResponseEntity.ok(staffService.updateById(id, staffDTO));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<StaffDTO> getEmpById(@PathVariable Long id) {
        return staffService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<StaffDTO>> getByRole(@PathVariable String role) {
        return ResponseEntity.ok(staffService.findByRole(role));
    }

    @PostMapping("/addStaff")
    public ResponseEntity<StaffDTO> create(@RequestBody StaffDTO staffDTO) {
        return ResponseEntity.ok(staffService.createStaff(staffDTO));
    }
}
package com.example.staff_service.services;

import com.example.staff_service.dto.StaffDTO;
import com.example.staff_service.entities.StaffModel;
import com.example.staff_service.interfaces.IStaffService;
import com.example.staff_service.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffService implements IStaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public StaffDTO createStaff(StaffDTO staff) {
        StaffModel staffModel = convertToStaffModel(staff);
        staffRepository.save(staffModel);
        return staff;
    }

    @Override
    public List<StaffDTO> findByRole(String role) {
        List<StaffModel> staffModels = staffRepository.findByRole(role);
        return staffModels.stream()
                .map(this::convertToStaffDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<StaffDTO> findById(Long empId) {
        return Optional.ofNullable(staffRepository.findByEmpId(empId))
                .map(this::convertToStaffDTO);
    }

    @Override
    public StaffDTO updateById(Long id, StaffDTO staffDTO) {
        StaffModel staffModel = staffRepository.findByEmpId(id);
        if (staffModel != null) {
            staffModel.setJoined(staffDTO.getJoined());
            staffModel.setName(staffDTO.getName());
            staffModel.setRole(staffDTO.getRole());
            staffRepository.save(staffModel);
            return convertToStaffDTO(staffModel);
        }
        return null;
    }

    @Override
    public boolean deleteById(Long id) {
        if (staffRepository.findByEmpId(id) == null) {
            return false;
        }
        staffRepository.deleteByEmpId(id);
        return true;
    }

    private StaffModel convertToStaffModel(StaffDTO staff) {
        return new StaffModel(staff.getRole(), staff.getSalary(), staff.getJoined(), staff.getName(), staff.getEmpId());
    }

    private StaffDTO convertToStaffDTO(StaffModel staff) {
        return new StaffDTO(staff.getId(), staff.getRole(), staff.getSalary(), staff.getJoined(), staff.getName(), staff.getEmpID());
    }
}
package com.example.staff_service.interfaces;

import com.example.staff_service.dto.StaffDTO;

import java.util.List;
import java.util.Optional;

public interface IStaffService {
    StaffDTO createStaff(StaffDTO staffDTO);
    List<StaffDTO> findByRole(String role);
    Optional<StaffDTO> findById(Long empId);
    StaffDTO updateById(Long id, StaffDTO staffDTO);
    boolean deleteById(Long id);
}
package com.example.staff_service.repository;

import com.example.staff_service.entities.StaffModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<StaffModel, Long> {
    List<StaffModel> findByRole(String role);
    StaffModel findByEmpId(Long empId);
    void deleteByEmpId(Long empId);
}
package com.example.staff_service.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class StaffModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long empID;
    private String role;
    private Long salary;
    private LocalDate joined;
    private String name;

    public StaffModel() {}

    public StaffModel(String role, Long salary, LocalDate joined, String name, Long empID) {
        this.role = role;
        this.salary = salary;
        this.joined = joined;
        this.name = name;
        this.empID = empID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmpID() {
        return empID;
    }

    public void setEmpID(Long empID) {
        this.empID = empID;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getSalary() {
        return salary;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public LocalDate getJoined() {
        return joined;
    }

    public void setJoined(LocalDate joined) {
        this.joined = joined;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
package com.example.staff_service.dto;

import java.time.LocalDate;

public class StaffDTO {
    private Long id;
    private Long empId;
    private String role;
    private Long salary;
    private LocalDate joined;
    private String name;

    public StaffDTO() {
    }

    public StaffDTO(Long id, String role, Long salary, LocalDate joined, String name, Long empId) {
        this.id = id;
        this.role = role;
        this.salary = salary;
        this.joined = joined;
        this.name = name;
        this.empId = empId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getSalary() {
        return salary;
    }

    public void setSalary(Long salary) {
        this.salary = salary;
    }

    public LocalDate getJoined() {
        return joined;
    }

    public void setJoined(LocalDate joined) {
        this.joined = joined;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

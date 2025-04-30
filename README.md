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
        return null; // Or throw an exception
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

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class StaffModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getEmpID() {
        return empID;
    }

    public void setEmpID(Long empID) {
        this.empID = empID;
    }

    private Long empID;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getRole() {
        return role;
    }
    public StaffModel(){

    }
    public StaffModel(String role, Long salary, LocalDate joined, String name,Long empID) {
        this.role = role;
        this.salary = salary;
        this.joined = joined;
        this.name = name;
        this.empID=empID;
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

    private String role;
    private Long  salary;
    private LocalDate joined;
    private String name;
}
package com.example.staff_service.dto;

import java.time.LocalDate;

public class StaffDTO {
    private Long id;
    private Long empId;

    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getRole() {
        return role;
    }
    public StaffDTO(){

    }
    public StaffDTO(Long id,String role, Long salary, LocalDate joined, String name,Long empId) {
        this.id=id;
        this.role = role;
        this.salary = salary;
        this.joined = joined;
        this.name = name;
        this.empId=empId;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String role;
    private Long  salary;
    private LocalDate joined;
    private String name;
}
package com.example.staff_service.controller;

import com.example.staff_service.dto.StaffDTO;
import com.example.staff_service.interfaces.IStaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.convert.PeriodUnit;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffControllers {
    @Autowired
    private IStaffService staffService;
    @DeleteMapping("/{Id}")
    public Boolean delteById(@PathVariable Long Id){
        return staffService.deleteById(Id);
    }

    @PutMapping("/{id}")
    public StaffDTO updateById(@PathVariable Long id,@RequestBody StaffDTO staffDTO){
        return staffService.updateById(id,staffDTO);
    }
    @GetMapping("/{id}")
    public StaffDTO getEmpById(@PathVariable Long id){
        return staffService.findbyid(id);
    }
    @GetMapping("/{role}")
    public List<StaffDTO> getByRole(@PathVariable String role){
        return staffService.findbyrole(role);
    }
    @PostMapping("/addStaff")
    public StaffDTO create(StaffDTO staffDTO){
        return staffService.createStaff(staffDTO);
    }
}
